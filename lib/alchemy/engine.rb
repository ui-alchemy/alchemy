require "alchemy"

module Alchemy
  class Engine < ::Rails::Engine
    isolate_namespace Alchemy

    initializer "alchemy.assets.paths" do |app|
      app.config.assets.paths << "#{self.root}/vendor/assets"
    end
  end
end
