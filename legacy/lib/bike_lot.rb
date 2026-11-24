
class Bike_Lot < Park
  ::MaximunBikeCapacity = 20
  attr_reader :spaces, :capacity
  def initialize
    @spaces = []
    @capacity = MaximunBikeCapacity
  end

  def park_by_type(vehicle)
    park_bike(vehicle) if vehicle.type == "Bike"
  end

  def park_bike(vehicle)
    raise 'Bike Park Full' if @bikes.spaces.count >= MaximunBikeCapacity
    @bikes.spaces.push(vehicle)
  end
end