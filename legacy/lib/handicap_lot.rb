class Handicap_Lot

  attr_reader :spaces, :capacity
  ::MaximunHandicapCapacity = 20
  
  def initialize
    @spaces = []
    @capacity = MaximunHandicapCapacity
  end
  
  end