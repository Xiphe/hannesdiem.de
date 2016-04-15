require 'nokogiri'

module Excerptify
  def excerptify(text, opt = 'few')
    textBeforeMore = text.split('<!-- more -->')[0]
    doc = Nokogiri.HTML(textBeforeMore)
    doc.css('*').each do |el|
      if opt == 'all' and el.name != 'body' and el.name != 'html'
        el.replace( doc.create_element "foo", el.content.strip )
      else
        if ([
          "div",
          "p",
          "span",
          "section",
        ]).include?(el.name)
          el.name = 'foo'
        elsif ![
          "br",
          "html",
          "body",
          "img",
          "audio",
          "source",
          "iframe"
        ].include?(el.name)
          el.replace( doc.create_element "foo", el.content.strip )
        end
      end
    end
    excerpt = doc.css('body').inner_html
      .gsub(/<foo>/, '')
      .gsub(/<\/foo>/, '')
      .gsub(/\s+/, ' ')
      .strip
      .strip[0..250]
      .gsub('"', opt == 'all' ? '&quot;' : '"')

    if (excerpt[-1, 1] =~ /\w/)
      return "#{excerpt}..."
    end

    return excerpt
  end
end

Liquid::Template.register_filter(Excerptify)