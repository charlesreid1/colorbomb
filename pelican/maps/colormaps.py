import json
import os
import kmeans

with open('colormaps.json','r') as f:
    d = json.load(f)

for k in d.keys():
    colormap_info = d[k]

    title = colormap_info['title']
    descr = colormap_info['description']
    
    image_file = 'images/'+k+'.jpg'

    if(os.path.isfile(image_file)):
        all_the_colors = [5,7,9]
        for Ncolors in all_the_colors:
            mycolorz = colorz(img_file,Ncolors)

    # dump all variables
    # to html template
