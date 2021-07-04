class Car_Lot
  ::MaximunCapacity = 100
attr_reader :spaces, :capacity
  def initialize
    @spaces = []
    @capacity = ::MaximunCapacity
  end

end