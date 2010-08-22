class String
  def make_dialogue(line_size)
    string_array = self.tokenize
    string_array.join_small_strings(line_size)
  end
  def tokenize
     self.scan(/\S+[ .?\/\';:<>!&+)]*/)
  end
end

class Array
  def last=(assignment)
    self[-1] = assignment
  end
  def join_small_strings(line_size)
    self.inject ([""]) do |memo, s|
      if memo.last.size + s.size < line_size
        memo.last = memo.last + s
        memo
      else
        if s.size > line_size
          # puts s
          # puts s.scan(/.{#{line_size}}/)
          array_to_add = s.scan(/.{#{line_size}}/)
          array_to_add.each do |i|
            memo << i 
          end
          memo << s[s.size/line_size*line_size..-1]
        else 
          memo << s
        end
      end
    end
  end
end
