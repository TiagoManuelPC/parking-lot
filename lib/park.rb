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
    @cars.spaces.push(vehicle) if vehicle.type == "Car"
    @bikes.spaces.push(vehicle) if vehicle.type == "Bike"
    @electric_cars.spaces.push(vehicle) if vehicle.type == "Electric Car"
    @bus.spaces.push(vehicle) if vehicle.type == "Bus"
    @handicap.spaces(vehicle) if vehicle.type == "Handicap"
    @lory.spaces(vehicle) if vehicle.type == "Lory"
  end
end