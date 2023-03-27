#!/usr/bin/env python
# encoding: utf-8
import json
from flask import Flask
from flask import request
import requests
import nmap
import whois
app = Flask(__name__)

@app.route('/webscan')
def web_scanner():
    url = request.args.get('url')
    r = requests.get(url)
    return json.dumps(dict(r.headers), indent=4, sort_keys=True)

@app.route('/web-whois')
def web_whois():
    url = request.args.get('url')
    w = whois.whois(url)
    return json.dumps(dict(w), indent=4, sort_keys=True, default=str)

@app.route('/port-scanner')
def port_scanner():
    url = request.args.get('ip')
    nm = nmap.PortScanner()
    res = nm.scan(url, '22-443')
    return json.dumps({'res': dict(res)})

app.run()