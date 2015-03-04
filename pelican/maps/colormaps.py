import json
import os
import re
import kmeans

with open('colormaps.json','r') as f:
    d = json.load(f)

for k in d.keys():
    colormap_info = d[k]

    slug = k
    title = colormap_info['title']
    descr = colormap_info['description']

    img_file = 'images/'+k+'.jpg'

    template_out_file = slug+'.html'

    print "Running k-means algorithm on image "+img_file

    # run k-means with these numbers of means
    N_all_the_colors = [5,7,9]

    if(os.path.isfile(img_file)):

        # run k-means clustering algorithm
        # to obtain color scheme colors

        all_the_colors = []

        for Ncolors in N_all_the_colors:
            mycolorz = kmeans.colorz(img_file,Ncolors)
            all_the_colors.append(mycolorz)

    print "Creating HTML template for theme "+title

    # dump all variables
    # to html template

    template_content = """

{% extends 'base_map.html' %}

{% block content %}
{% set myslug="MYSLUG" %}
{% set mytitle="MYTITLE" %}
{% set mydescr="MYDESCR" %}
{% set myjs="
<script type='text/javascript'> 
    var colors5 = [MYCOLORS5];
    var colors7 = [MYCOLORS7];
    var colors9 = [MYCOLORS9];
</script>
" %}
{% include '_includes/colormaptemplate.html' %}
{% endblock %}
"""

    # Now perform find/replace operations
    tc0 = template_content

    tc1 = re.sub("MYSLUG",slug,tc0)
    tc2 = re.sub("MYTITLE",title,tc1)
    tc3 = re.sub("MYDESCR",descr,tc2)

    mycolors5 = ",".join(all_the_colors[0])
    mycolors7 = ",".join(all_the_colors[1])
    mycolors9 = ",".join(all_the_colors[2])

    tc4 = re.sub("MYCOLORS5",mycolors5,tc3)
    tc5 = re.sub("MYCOLORS7",mycolors7,tc4)
    tc6 = re.sub("MYCOLORS9",mycolors9,tc5)

    final_template_content = tc6

    with open(template_out_file,'w') as f:
        f.write(final_template_content)

    print "Finished with "+title
    print ""
