import json

a = {}
b = {'level2a':1,'level2b':2}
a['level1'] = b

with open('dummy.json','w') as f:
    f.write(json.dumps(a, sort_keys=True, indent=4, separators=(',', ': ')))
