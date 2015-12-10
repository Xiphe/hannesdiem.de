require 'liquid'
require 'uri'

# https://gist.github.com/rklemme/2923072
HTML_TAG_REPLACEMENTS = {
  'br' => "\n",
}
HTML_QUOTE_REPLACEMENTS = {
  'quot' => '"',
  'amp' => '&',
}

def strip_html(str, tag = HTML_TAG_REPLACEMENTS, quot = HTML_QUOTE_REPLACEMENTS)
  str.gsub %r{
    # first alternative: remove tags
    <
      (?:
        (?:(\w+) # tag name
	  # alternative: attributes
          (?:
	    \s+
	    \w+  # attr name
	    =
	    (?:"[^"]*"|'[^']*') # attr value
	  )*
	  /? # optional tag closes also
        )
        |
        # alternative: closing tag
        (/\w+)
       )
    >
    |
    # second alternative: replace HTML entities
    &
    (\w+)
    ;
  }x do |m|
    tg = $1 || $2

    if tg
      tag[tg]
    else
      quot[$3]
    end
  end
end

module Excerptify
  def excerptify(text)
    return "#{strip_html(text)[0..197]}...".gsub('"', '&quot;')
  end
end

Liquid::Template.register_filter(Excerptify)