function slugify(input) {
    return input.toLowerCase().replace(/ /g, "_");
}

export {
    slugify
};
