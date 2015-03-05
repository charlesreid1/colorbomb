from collections import namedtuple
from math import sqrt
import random
try:
    import Image
except ImportError:
    from PIL import Image

Point = namedtuple('Point', ('coords', 'n', 'ct'))
Cluster = namedtuple('Cluster', ('points', 'center', 'n'))

rtoh = lambda rgb: '#%s' % ''.join(('%02x' % p for p in rgb))

def colorz(filename, n=3):
    img = Image.open(filename)
    img.thumbnail((100, 100))
    w, h = img.size

    points = get_points(img)
    clusters = kmeans(points, n, 1)
    rgbs = [map(int, c.center.coords) for c in clusters]
    return map(rtoh, rgbs)

def get_points(img):
    points = []
    w, h = img.size
    for count, color in img.getcolors(w * h):
        points.append(Point(color, 3, count))
    return points

def euclidean(p1, p2):
    return sqrt(sum([
        (p1.coords[i] - p2.coords[i]) ** 2 for i in range(p1.n)
    ]))

def calculate_center(points, n):
    vals = [0.0 for i in range(n)]
    plen = 0
    for p in points:
        plen += p.ct
        for i in range(n):
            vals[i] += (p.coords[i] * p.ct)
    return Point([(v / plen) for v in vals], n, 1)

def kmeans(points, k, min_diff):
    clusters = [Cluster([p], p, p.n) for p in random.sample(points, k)]

    while 1:
        plists = [[] for i in range(k)]

        for p in points:
            smallest_distance = float('Inf')
            for i in range(k):
                distance = euclidean(p, clusters[i].center)
                if distance < smallest_distance:
                    smallest_distance = distance
                    idx = i
            plists[idx].append(p)

        diff = 0
        for i in range(k):
            old = clusters[i]
            center = calculate_center(plists[i], old.n)
            new = Cluster(plists[i], center, old.n)
            clusters[i] = new
            diff = max(diff, euclidean(old.center, new.center))

        if diff < min_diff:
            break

    return clusters

if __name__=="__main__":

    with open('kmeans.html','w') as f:
        f.write("<html>\n")
        f.write("<head>\n")
        f.write("<title>k-means colors</title>\n")
        f.write("</head>\n")
        f.write("<body>\n")

        import glob
        img_files = glob.glob("*.jpg")
        #img_files = ["01.jpg","02.jpg"]

        all_the_colors = [5,7,9,11]
        w = 400
        for img_file in img_files:

            code_strings = []

            f.write('<img width="%dpx" height="%dpx" src="%s" />\n'%(w,w,img_file))
            for Ncolors in all_the_colors:

                mycolorz = colorz(img_file,Ncolors)

                cw = w/Ncolors
                f.write('<div id="inner" style="overflow:hidden;width: 2000px">\n')
                for color in mycolorz:

                    f.write('<div style="float: left; width: %dpx; height: %dpx; background-color: %s;"></div>\n'%(cw,cw,color))

                f.write('</div>\n')

                code_strings.append( "var colors"+str(Ncolors)+" = ["+",".join(["'"+c+"'" for c in mycolorz])+"];" )

            f.write("<p>Javascript strings:</p>")

            for code_string in code_strings:
                f.write("<p><code>")
                f.write( code_string );
                f.write("</code></p>\n")
                f.write("<p>&nbsp;</p>\n")

            f.write("<p>&nbsp;</p>\n")

        f.write("</body>\n")
        f.write("</html>\n")


