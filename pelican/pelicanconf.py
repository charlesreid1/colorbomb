from __future__ import unicode_literals

from util import *

SITEURL = ''

AUTHOR = u'charlesreid1'
SITENAME = u'COLORBOMB'
#SITEURL = '/sundrop'

make_common_js('maps/common.js',SITEURL)

PATH = 'content'

TIMEZONE = 'America/Los_Angeles'

DEFAULT_LANG = u'en'




# --------------8<---------------------

SITETAGLINELONGER = "Creating cartographic colormaps from graffiti photos<br />using Python and k-means clustering"
SITETAGLINE = "Creating cartographic colormaps from graffiti photos"

THEME = 'colorbomb-theme'


# This is stuff that goes into content/ that's copied into the website 
STATIC_PATHS = ['images']

DISPLAY_PAGES_ON_MENU = False



EXTRA_TEMPLATES_PATHS = ['maps']

###########################################
# Maps

TEMPLATE_PAGES = {}

TEMPLATE_PAGES['index.html'] = 'index.html'


# Common
TEMPLATE_PAGES['mapstyles.css'] = 'mapstyles.css'
TEMPLATE_PAGES['common.js'] = 'common.js'

# Map data
TEMPLATE_PAGES['ca.geo.json']  = 'ca.geo.json'

# Maps
TEMPLATE_PAGES['basic.html']  = 'basic/index.html'
TEMPLATE_PAGES['basic.js']    = 'basic.js'


### # Add all the geojson for education ca map
### geojson_path = "maps/educationca.geojson"
### EXTRA_TEMPLATES_PATHS += [geojson_path]
### import os
### for f in os.listdir(geojson_path):
###     if f.endswith(".json"):
###         TEMPLATE_PAGES["educationca.geojson/"+f] = f



# --------------8<---------------------




# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

DEFAULT_PAGINATION = False

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
