/** @type {any} */
module.exports = (theme) => ({
  DEFAULT: {
    css: {
      "--tw-prose-body": theme("colors.ink[950]"),
      "--tw-prose-headings": theme("colors.ink[950]"),
      "--tw-prose-licorice-headings": theme("colors.caramel[500]"),
      "--tw-prose-lead": theme("colors.ink[950]"),
      "--tw-prose-links": theme("colors.black"),
      "--tw-prose-bold": theme("colors.ink[950]"),
      "--tw-prose-counters": theme("colors.ink[800]"),
      "--tw-prose-bullets": theme("colors.ink[800]"),
      "--tw-prose-hr": theme("colors.ink[800]"),
      "--tw-prose-quotes": theme("colors.ink[900]"),
      "--tw-prose-quote-borders": theme("colors.ink[800]"),
      "--tw-prose-captions": theme("colors.ink[900]"),
      "--tw-prose-code": theme("colors.ink[900]"),
      "--tw-prose-pre-code": theme("colors.ink[100]"),
      "--tw-prose-pre-bg": theme("colors.ink[900]"),
      "--tw-prose-th-borders": theme("colors.ink[800]"),
      "--tw-prose-td-borders": theme("colors.ink[800]"),
      "--tw-prose-invert-body": theme("colors.graphite[100]"),
      "--tw-prose-invert-headings": theme("colors.graphite[50]"),
      "--tw-prose-invert-licorice-headings": theme("colors.graphite[50]"),
      "--tw-prose-invert-lead": theme("colors.graphite[100]"),
      "--tw-prose-invert-links": theme("colors.white"),
      "--tw-prose-invert-bold": theme("colors.white"),
      "--tw-prose-invert-counters": theme("colors.graphite[300]"),
      "--tw-prose-invert-bullets": theme("colors.graphite[300]"),
      "--tw-prose-invert-hr": theme("colors.white"),
      "--tw-prose-invert-quotes": theme("colors.graphite[100]"),
      "--tw-prose-invert-quote-borders": theme("colors.graphite[300]"),
      "--tw-prose-invert-captions": theme("colors.graphite[300]"),
      "--tw-prose-invert-code": theme("colors.white"),
      "--tw-prose-invert-pre-code": theme("colors.graphite[300]"),
      "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
      "--tw-prose-invert-th-borders": theme("colors.graphite[300]"),
      "--tw-prose-invert-td-borders": theme("colors.graphite[300]"),
    },
  },
  invert: {
    css: {
      "--tw-prose-licorice-headings":
        "var(--tw-prose-invert-licorice-headings)",
    },
  },
  licorice: {
    css: {
      h1: {
        fontFamily: theme("fontFamily.licorice.0"),
        fontWeight: "normal",
        color: "var(--tw-prose-licorice-headings)",
        fontSize: theme("fontSize.6xl.0"),
        marginBottom: "0.5rem",
      },
      h2: {
        fontFamily: theme("fontFamily.licorice.0"),
        fontWeight: "normal",
        color: "var(--tw-prose-licorice-headings)",
        fontSize: theme("fontSize.5xl.0"),
        marginBottom: "0.5rem",
      },
      h3: {
        fontFamily: theme("fontFamily.licorice.0"),
        fontWeight: "normal",
        color: "var(--tw-prose-licorice-headings)",
        fontSize: theme("fontSize.4xl.0"),
        marginBottom: "0.5rem",
      },
      h4: {
        fontFamily: theme("fontFamily.licorice.0"),
        fontWeight: "normal",
        color: "var(--tw-prose-licorice-headings)",
        fontSize: theme("fontSize.3xl.0"),
        marginBottom: "0",
      },
    },
  },
  xl: {
    css: {
      ".prose-licorice h1": {
        fontSize: theme("fontSize.7xl.0"),
        marginBottom: "1rem",
      },
      ".prose-licorice h2": {
        fontSize: theme("fontSize.6xl.0"),
        marginBottom: "1rem",
      },
      ".prose-licorice h3": {
        fontSize: theme("fontSize.5xl.0"),
        marginBottom: "1rem",
      },
      ".prose-licorice h4": {
        fontSize: theme("fontSize.4xl.0"),
        marginBottom: "1rem",
      },
    },
  },
});
