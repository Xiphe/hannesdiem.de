require 'net/http'

module GetBytes
  def getbytes(path, host)
    request = Net::HTTP.new(host, 80)
    head = request.request_head(path)
    return head.header['content-length']
  end
end

Liquid::Template.register_filter(GetBytes)