require 'lory_lot'

describe Lory_Lot do
subject(:lory_lot) {Lory_Lot.new}

it 'has spaces for lorys' do
expect(lory_lot.spaces).to eq []
end

it 'has a maximun capacity of 5' do
  expect(lory_lot.capacity).to eq 5
end

end