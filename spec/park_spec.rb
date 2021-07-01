require 'park.rb'

describe Park do
  subject(:park) { Park.new }

  it 'is a instance of Park class' do
    expect(park).to be_an_instance_of(Park)
  end


end