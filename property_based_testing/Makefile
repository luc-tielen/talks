
schematics:
	find schematics -type f | grep .dot | \
		xargs basename -s .dot | \
		xargs -I {} -n2 dot -Tsvg schematics/{}.dot -o images/{}.svg

optimize_images: schematics
	svgo images/

.PHONY: schematics optimize_images
