require_relative 'car_Lot'
require_relative 'bike_Lot'
require_relative 'electric_Car_Lot'
require_relative 'bus_Lot'
require_relative 'handicap_Lot'
require_relative 'lory_Lot'
require_relative 'vehicle'


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

  def park_vehicle(vehicle = Vehicle.new(type))
    park_by_type(vehicle)
  end

  def leave_park(vehicle)
    leave_park_by_type(vehicle)
  end



  private

  # def park_car(vehicle = Vehicle.new)
  #   raise 'Car Park Full' if @cars.spaces.count >= MaximunCarCapacity
  #   @cars.spaces.push(vehicle)
  # end

  # def park_bike(vehicle = Vehicle.new)
  #   raise 'Bike Park Full' if @bikes.spaces.count >= MaximunBikeCapacity
  #   @bikes.spaces.push(vehicle)
  # end

  def park_bus(vehicle = Vehicle.new)
    raise 'Bus Park Full' if @bus.spaces.count >= MaximunBusCapacity
    @bus.spaces.push(vehicle)
  end

  def park_electric_car(vehicle = Vehicle.new)
    raise 'Electric Car Park Full' if @electric_cars.spaces.count >= MaximunElectricCarCapacity
    @electric_cars.spaces.push(vehicle)
  end

  def park_handicap(vehicle = Vehicle.new)
    raise 'Handicap Car Park Full' if @handicap.spaces.count >= MaximunHandicapCapacity
    @handicap.spaces.push(vehicle)
  end

  def park_lory(vehicle = Vehicle.new)
    raise 'Lory Park Full' if @lory.spaces.count >= MaximunLoryCapacity
    @lory.spaces.push(vehicle)
  end

  # def park_by_type(vehicle)
  #   park_bike(vehicle) if vehicle.type == "Bike"
  #   park_electric_car(vehicle) if vehicle.type == "Electric Car"
  #   park_bus(vehicle) if vehicle.type == "Bus"
  #   park_handicap(vehicle) if vehicle.type == "Handicap"
  #   park_lory(vehicle) if vehicle.type == "Lory"
  # end

  def leave_park_by_type(vehicle)
    @cars.spaces.delete(vehicle) if vehicle.type == "Car"
    @bikes.spaces.delete(vehicle) if vehicle.type == "Bike"
    @electric_cars.spaces.delete(vehicle) if vehicle.type == "Electric Car"
    @bus.spaces.delete(vehicle) if vehicle.type == "Bus"
    @handicap.spaces.delete(vehicle) if vehicle.type == "Handicap"
    @lory.spaces.delete(vehicle) if vehicle.type == "Lory"
  end
end