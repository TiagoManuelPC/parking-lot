require 'Car_Lot'
require 'Bike_Lot'
require 'Electric_Car_Lot'
require 'Bus_Lot'
require 'Handicap_Lot'
require 'Lory_Lot'
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

end