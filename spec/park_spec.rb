require 'park.rb'


describe Park do
  subject(:park) { Park.new }
  let(:car) { Vehicle.new('Car') }
  let(:bus) { Vehicle.new('Bus') }
  let(:bike) { Vehicle.new('Bike') }
  let(:electric_car) { Vehicle.new('Electric Car') }
  let(:lory) { Vehicle.new('Lory') }
  let(:handicap) { Vehicle.new('Handicap') }

  
  it 'is a instance of Park class' do
    expect(park).to be_an_instance_of(Park)
  end

  context '# Has spaces for' do
    it 'cars' do
      expect(park.cars).to  be_an_instance_of(Car_Lot)
    end

    it 'bikes' do
      expect(park.bikes).to be_an_instance_of(Bike_Lot)
    end

    it 'electric cars' do
      expect(park.electric_cars).to be_an_instance_of(Electric_Car_Lot)
    end

    it 'bus' do
      expect(park.bus).to be_an_instance_of(Bus_Lot)
    end

    it 'lorys' do
      expect(park.lory).to be_an_instance_of(Lory_Lot)
    end

    it 'handicaps' do
      expect(park.handicap).to be_an_instance_of(Handicap_Lot)
    end

  end

  it 'responds to park_vehicle' do
    expect(park).to respond_to(:park_vehicle).with(1).argument
  end

  context '#can park a ' do
    it 'car' do
      park.park_vehicle(car)
      expect(park.cars.spaces).to eq([car])
    end
    it 'bike' do
      park.park_vehicle(bike)
      expect(park.bikes.spaces).to eq([bike])
    end
    it 'bus' do
      park.park_vehicle(bus)
      expect(park.bus.spaces).to eq([bus])
    end

    it 'electric car' do
      park.park_vehicle(electric_car)
      expect(park.electric_cars.spaces).to eq([electric_car])
    end

    it 'lory' do
      park.park_vehicle(lory)
      expect(park.lory.spaces).to eq([lory])
    end

    it 'handicap' do
      park.park_vehicle(handicap)
      expect(park.handicap.spaces).to eq([handicap])
    end

  end

  it 'parks cars in the correct space' do
    park.park_vehicle(bus)
    park.park_vehicle(bike)
    expect(park.cars.spaces).to be_empty
    expect(park.bikes.spaces).to eq([bike])
  end
  context '#lets the' do
    it 'car leave the car park' do
      park.park_vehicle(car)
      park.leave_park(car)
      expect(park.cars.spaces).to be_empty
    end

    it 'bike leave the park' do
      park.park_vehicle(bike)
      park.leave_park(bike)
      expect(park.bikes.spaces).to be_empty
    end

    it 'bus leave the park' do
      park.park_vehicle(bus)
      park.leave_park(bus)
      expect(park.bus.spaces).to be_empty
    end

    it 'electric car leave the park' do
      park.park_vehicle(electric_car)
      park.leave_park(electric_car)
      expect(park.electric_cars.spaces).to be_empty
    end

    it 'handicap vehicle leave the park' do
      park.park_vehicle(handicap)
      park.leave_park(handicap)
      expect(park.handicap.spaces).to be_empty
    end

    it 'lory leave the park' do
      park.park_vehicle(lory)
      park.leave_park(lory)
      expect(park.lory.spaces).to be_empty
    end
  end  

  context 'gives an error when' do
    it 'car lot is full' do
      MaximunCarCapacity.times {park.park_vehicle(car)}
      expect {park.park_vehicle(car)}.to raise_error('Car Park Full')
    end

    it 'bike lot is full' do
      MaximunBikeCapacity.times {park.park_vehicle(bike)}
      expect {park.park_vehicle(bike)}.to raise_error('Bike Park Full')
    end

    it 'bus lot is full' do
      MaximunBusCapacity.times {park.park_vehicle(bus)}
      expect {park.park_vehicle(bus)}.to raise_error('Bus Park Full')
    end
  end
end