require 'park.rb'


describe Park do
  subject(:park) { Park.new }


  
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

  
end