import json
import os
import re
import kmeans

"""
Colorbomb Colormap Page Generator


What it does:

    This turns images of graffiti into colormaps,
    then creates pages and items on the home page 
    for the colormaps that it created.


Instructions:

    First, put your images into
    
    pelican/content/colormaps
    
    Second, edit the file
    
    colormaps.json
    
    add a key to the main dictionary
    that is the same as the name of your image.
    
    and make each key (the name of the image without ".jpg")
    a dictionary with a title and description.
    
    Then run this script.
    It will compute k-means,
    create html template,
    add an image to the splash page.


"""


#############################
# First, load photo info

with open('colormaps.json','r') as f:
    d = json.load(f)





#############################
# We will assemble a string
# containing HTML
# to add items to front page
# 
# it is based on a template,
# and we do a find-and-replace.
#
# splash_page_html - html for entire splash page (what we're modifying)
#
# splash_table_html - html for items table (what we're appending)
#


splash_in_file = 'splash.template.html'
splash_out_file = 'slpash.html'


with open('splash.template.html','r') as f:
    splash_page_html = f.read()


splash_table_html = """
                    <div class="row">
                    """


for k in d.keys():
    colormap_info = d[k]

    slug = k
    title = colormap_info['title']
    descr = colormap_info['description']

    img_file = '../content/colormaps/'+k+'.jpg'

    template_out_file = slug+'.html'


    # run k-means with these numbers of means
    N_all_the_colors = [5,7,9]
    all_the_colors = []

    if(os.path.isfile(img_file)):



        ##########################
        # Run k-means
        # 

        print "Running k-means algorithm on image "+img_file


        # run k-means clustering algorithm
        # to obtain color scheme colors

        for Ncolors in N_all_the_colors:
            mycolorz = kmeans.colorz(img_file,Ncolors)
            all_the_colors.append(mycolorz)





        ##########################
        # Make page
        # 

        print "Creating page for theme "+title

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




        ##########################
        # Add item to splash page
        # 

        print "Adding item on main page for theme "+title

        # This is really a job for beautifulsoup,
        # but keeping it simple.

        # modify this table item
        # then add to the splash page's table code
        table_item = """
        <div class="col-sm-4 featurette">
            <a href="{{ SITEURL }}/MYSLUG/">
            <img class="img-circle" src="{{ SITEURL }}/colormaps/MYSLUG.jpg" alt="basic" style="width: 150px; height: 150px;">
            </a>
            <div id="inner" style="overflow:hidden;width: 150px">
                <div style="float: left; width: 30px; height: 30px; background-color: BGCOLOR1;"></div>
                <div style="float: left; width: 30px; height: 30px; background-color: BGCOLOR2;"></div>
                <div style="float: left; width: 30px; height: 30px; background-color: BGCOLOR3;"></div>
                <div style="float: left; width: 30px; height: 30px; background-color: BGCOLOR4;"></div>
                <div style="float: left; width: 30px; height: 30px; background-color: BGCOLOR5;"></div>
            </div>
            <h2>MYTITLE</h2>
            <p>
                <a class="btn btn-default" href="{{ SITEURL }}/MYSLUG/" role="button">
                    CHECK IT &raquo;
                </a>
            </p>
        </div>
        """
        t1 = re.sub("MYSLUG",slug,table_item)
        t2 = re.sub("MYTITLE",title,t1)
        t3 = re.sub("BGCOLOR1",all_the_colors[0][0],t2)
        t4 = re.sub("BGCOLOR2",all_the_colors[0][1],t3)
        t5 = re.sub("BGCOLOR3",all_the_colors[0][2],t4)
        t6 = re.sub("BGCOLOR4",all_the_colors[0][3],t5)
        t7 = re.sub("BGCOLOR5",all_the_colors[0][4],t6)


        splash_table_html += t7
        splash_table_html += "\n"

        print "Finished with "+title
        print ""

print "Making final splash page"

splash_table_html += "</div>"
with open('splash.html','w') as f:
    f.write(splash_table_html)

print ""
print "All done"
print ""

