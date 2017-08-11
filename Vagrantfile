Vagrant.configure("2") do |config|
  config.vm.box = "laravel/homestead"
  config.vm.synced_folder ".", "/home/Sites/swap"
  config.vm.network :private_network, ip: "192.168.10.10"
end
