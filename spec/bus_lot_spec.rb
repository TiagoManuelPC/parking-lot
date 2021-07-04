require 'bus_lot'

describe Bus_Lot do
subject(:bus_lot) {Bus_Lot.new}

it 'has spaces for bus' do
expect(bus_lot.spaces).to eq []
end
it 'has a maximun capacity of 5' do
  expect(bus_lot.capacity).to eq 5
end

end