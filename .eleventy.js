module.exports = function (eleventyConfig) {
  // Passthrough: keep css, js, admin, and images as-is in the output
  eleventyConfig.addPassthroughCopy({ css: "css" });
  eleventyConfig.addPassthroughCopy({ js: "js" });
  eleventyConfig.addPassthroughCopy({ admin: "admin" });

  // Format dates: 2021-02-14 → "February 14, 2021"
  eleventyConfig.addFilter("dateFormat", function (date) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  // Limit an array to N items
  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  // Prev/next story navigation (stories array should be newest-first)
  eleventyConfig.addFilter("getPrevStory", function (stories, currentUrl) {
    const idx = stories.findIndex((s) => s.url === currentUrl);
    return idx > 0 ? stories[idx - 1] : null;
  });

  eleventyConfig.addFilter("getNextStory", function (stories, currentUrl) {
    const idx = stories.findIndex((s) => s.url === currentUrl);
    return idx < stories.length - 1 ? stories[idx + 1] : null;
  });

  return {
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "_site",
      layouts: "_layouts",
    },
  };
};
