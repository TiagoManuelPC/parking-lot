require 'vehicle'

describe Vehicle do
  subject(:car) {Vehicle.new('Car')}

  it 'car is an instace of Vehicle class' do
    expect(car).to be_an_instance_of(Vehicle)
  end

  it 'has a type' do
    expect(car.type).to eq('Car')
  end

  





end