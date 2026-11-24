require_relative 'park'
class Car_Lot < Park
  ::MaximunCarCapacity = 100
  attr_reader :spaces, :capacity
  def initialize
    @spaces = []
    @capacity = ::MaximunCarCapacity
  end

  def park_by_type(vehicle)
    park_car(vehicle) if vehicle.type == "Car"
  end

  def park_car(vehicle)
    raise 'Car Park Full' if @cars.spaces.count >= MaximunCarCapacity
    @cars.spaces.push(vehicle)
  end
end