def make_common_js(url,dest):
    with open(dest,'w') as f:
        f.write("var prefix = \"%s\";"%(url) );
