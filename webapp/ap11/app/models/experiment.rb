class Experiment < ActiveRecord::Base
  attr_accessible :date, :title, :user_id

  belongs_to :user

  has_one :collection, :foreign_key => 'experiment_id', :dependent => :destroy

  validates :date,  :presence => true
  validates :title, :presence => true
end
