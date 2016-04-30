module ToDuration
  def toduration(bytes)
    return Time.at(bytes.to_i / 21020).utc.strftime("%H:%M:%S")
  end
end

Liquid::Template.register_filter(ToDuration)