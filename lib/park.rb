require 'Car_Lot'
require 'Bike_Lot'
require 'Electric_Car_Lot'
require 'Bus_Lot'
require 'Handicap_Lot'
require 'Lory_Lot'
require 'Vehicle'
class Park

   attr_reader :cars, :bikes, :electric_cars, :bus, :handicap, :lory

  def initialize(cars = Car_Lot.new, bikes = Bike_Lot.new, electric_cars = Electric_Car_Lot.new, bus = Bus_Lot.new, handicap = Handicap_Lot.new, lory = Lory_Lot.new)
    @cars = cars
    @bikes = bikes
    @electric_cars = electric_cars
    @bus = bus
    @handicap = handicap
    @lory = lory
  end

  def park_vehicle(vehicle = Vehicle.new)
    park_car(vehicle) if vehicle.type == "Car"
    park_bike(vehicle) if vehicle.type == "Bike"
    @electric_cars.spaces.push(vehicle) if vehicle.type == "Electric Car"
    park_bus(vehicle) if vehicle.type == "Bus"
    @handicap.spaces.push(vehicle) if vehicle.type == "Handicap"
    @lory.spaces.push(vehicle) if vehicle.type == "Lory"
  end

  def leave_park(vehicle)
    @cars.spaces.delete(vehicle) if vehicle.type == "Car"
    @bikes.spaces.delete(vehicle) if vehicle.type == "Bike"
    @electric_cars.spaces.delete(vehicle) if vehicle.type == "Electric Car"
    @bus.spaces.delete(vehicle) if vehicle.type == "Bus"
    @handicap.spaces.delete(vehicle) if vehicle.type == "Handicap"
    @lory.spaces.delete(vehicle) if vehicle.type == "Lory"
  end

  private

  def park_car(vehicle = Vehicle.new)
    raise 'Car Park Full' if @cars.spaces.count >= MaximunCarCapacity
    @cars.spaces.push(vehicle)
  end

  def park_bike(vehicle = Vehicle.new)
    raise 'Bike Park Full' if @bikes.spaces.count >= MaximunBikeCapacity
    @bikes.spaces.push(vehicle)
  end

  def park_bus(vehicle = Vehicle.new)
    raise 'Bus Park Full' if @bus.spaces.count >= MaximunBusCapacity
    @bus.spaces.push(vehicle)
  end

  # def park_car(vehicle = Vehicle.new)
  #   raise 'Car Park Full' if @cars.spaces.count >= 100
  #   @cars.spaces.push(vehicle)
  # end

  # def park_car(vehicle = Vehicle.new)
  #   raise 'Car Park Full' if @cars.spaces.count >= 100
  #   @cars.spaces.push(vehicle)
  # end

  # def park_car(vehicle = Vehicle.new)
  #   raise 'Car Park Full' if @cars.spaces.count >= 100
  #   @cars.spaces.push(vehicle)
  # end
end