#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#
# Simple script to create the admin super user
#
# Copyright (C) 2019
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
#
# Authors:
#   David Moreno Lumbreras <dmorenolumb@gmail.com>
#
#
import argparse
import json
import os
import sys
import ssl
import logging

from elasticsearch import Elasticsearch
from elasticsearch.connection import create_ssl_context


def main():
    args = parse_args()
    
    if args.date_field:
        date_field = args.date_field
    else:
        date_field = "grimoire_creation_date"
    
    if args.fields:
        fields = args.fields
    else:
        fields = ["_score", "file_path", "blanks_per_loc", "ccn", "comments", "comments_per_loc", "loc",
                            "loc_per_function", "num_funs", "tokens"]
        
    if args.date_field:
        output = args.output_file
    else:
        output = "data.json"
    
    logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(message)s')
    ssl_context = create_ssl_context()
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE
    
    es = Elasticsearch([args.es_url], timeout=120, max_retries=20, ssl_context=ssl_context,
                       retry_on_timeout=True,
                       verify_certs=False)
    
    files_now = get_files_at_last_commit(es, args.index, date_field)
    city_items = get_last_city(es, args.index, files_now, date_field, fields)

    with open(output, 'w') as f:
        json.dump(city_items, f)
    

def get_files_at_last_commit(es, index, date_field):
    page = es.search(
        index=index,
        scroll="1m",
        size=1,
        body={
            "sort": {
                date_field: "desc"
            },
            "query": {
                "match_all": {}
            },
            "_source": ["files_at_commit"]
        }
    )
    
    sid = page['_scroll_id']
    scroll_size = page['hits']['total']
    
    if scroll_size == 0:
        print("No data found!")
        return []
    
    return page['hits']['hits'][0]["_source"]["files_at_commit"]


def get_last_city(es, index, files, date_field, fields):
    items = []
    for file in files:
        logging.debug("Querying {}/{}".format(index, file))
        page = es.search(
            index=index,
            scroll="1m",
            size=1,
            body={
                "sort": {date_field: "desc"},
                "query": {
                    "match": {
                        "file_path": file
                    }
                },
                "_source": fields
            }
        )
        if len(page['hits']['hits']) > 0:
            items.append(page['hits']['hits'][0]["_source"])
    
    return items


def parse_args():
    parser = argparse.ArgumentParser(usage="usage: cocom_graal2es.py [options]",
                                     description="Generate the structure needed to feed the geocodecitycomponent")
    parser.add_argument("-esurl", "--es-url", required=True,
                        help="Elasticsearch URL")
    parser.add_argument("-index", "--index", required=True,
                        help="Index where the data is going to be fetched")
    parser.add_argument("-fields", "--fields", required=False,
                        help="Fields of the list to be fetched")
    parser.add_argument("-datefield", "--date-field", required=False,
                        help="Date field of where the data is going to be fetched")
    parser.add_argument("-outputfile", "--output-file", required=False,
                        help="Date field of where the data is going to be fetched")
    
    return parser.parse_args()


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        s = "\n\nReceived Ctrl-C or other break signal. Exiting.\n"
        sys.stdout.write(s)
        sys.exit(0)
