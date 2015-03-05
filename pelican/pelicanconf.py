from __future__ import unicode_literals

from util import *

SITEURL = ''

AUTHOR = u'charlesreid1'
SITENAME = u'COLORBOMB'
SITEURL = '/colorbomb'

make_common_js('maps/common.js',SITEURL)

PATH = 'content'

TIMEZONE = 'America/Los_Angeles'

DEFAULT_LANG = u'en'




# --------------8<---------------------

SITETAGLINELONGER = "Creating cartographic colormaps from graffiti photos<br />using Python and k-means clustering"
SITETAGLINE = "Creating cartographic colormaps from graffiti photos"

THEME = 'colorbomb-theme'


# This is stuff that goes into content/ that's copied into the website 
STATIC_PATHS = ['colormaps']
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
TEMPLATE_PAGES['sfcensus.geo.json']  = 'sfcensus.geo.json'

# Colormaps
TEMPLATE_PAGES['colormaps.js']   = 'colormaps.js'
TEMPLATE_PAGES['colormaps.css']  = 'colormaps.css'

TEMPLATE_PAGES['bigred.html'] = 'bigred/index.html'
TEMPLATE_PAGES['elif.html'] = 'elif/index.html'
TEMPLATE_PAGES['theride.html'] = 'theride/index.html'
TEMPLATE_PAGES['thejacka.html'] = 'thejacka/index.html'
TEMPLATE_PAGES['bricks.html'] = 'bricks/index.html'
TEMPLATE_PAGES['zero.html'] = 'zero/index.html'
TEMPLATE_PAGES['jaywalk.html'] = 'jaywalk/index.html'


#TEMPLATE_PAGES['basic.html']  = 'basic/index.html'
#TEMPLATE_PAGES['basic.css']   = 'basic.css'
#TEMPLATE_PAGES['basic.js']    = 'basic.js'


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
