require 'park.rb'

describe Park do
  subject(:park) { Park.new }

  it 'is a instance of Park class' do
    expect(park).to be_an_instance_of(Park)
  end

  it ' has parking spaces for cars' do
    expect(park.cars).to eq []
  end

  it ' has parking spaces for bikes' do
    expect(park.bikes).to eq []
  end

  it ' has parking spaces for electric cars' do
    expect(park.electric_cars).to eq []
  end

  it ' has parking spaces for bus' do
    expect(park.bus).to eq []
  end

  it ' has parking spaces for lorys' do
    expect(park.lory).to eq []
  end

  it ' has parking spaces for cars' do
    expect(park.handicap).to eq []
  end

end