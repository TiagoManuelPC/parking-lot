require 'car_lot'

describe Car_Lot do
subject(:car_lot) {Car_Lot.new}
subject(:park) {Park.new}
let(:car) {Vehicle.new("Car")}

it 'has spaces for cars' do
expect(car_lot.spaces).to eq []
end

it 'has a maximun capacity of 100' do
  expect(car_lot.capacity).to eq 100
end

it 'raises error if maximum capacity is exceded' do
  MaximunCarCapacity.times {park.park_vehicle(car)}
  expect {park.park_vehicle(car)}.to raise_error('Car Park Full')
end

end