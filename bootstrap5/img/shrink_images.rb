#!/usr/bin/env ruby

# helper script to shrink images ~430px wide - faster page load
# cd into img folder run ./shrink_images
# it will shrink all jpg images to 430px wide
# possibly a bit too small for the carousell on a desktop! :/
# puts the originals into scratch

require 'rubygems'
require 'fileutils'

# some images mahoosive! change size to 430px wide
# scale = 430.0 / file.width
require 'rmagick'



# = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
def rmagik_info(file)
    puts "- - - - - :rmagik-S"
    puts file
    puts ">> Checking for oversized file > 430px wide"
    img = Magick::Image::read(file).first
    puts "Geometry: #{img.columns}x#{img.rows}  - #{img.columns.class}x#{img.rows.class}"

    if img.columns > 430    # resize to 430 wide
      
      scale = (430.0 / img.columns.to_f).round(6)   # calculate scaling factor for image
      
      puts "RESIZING before copying x#{scale}"
      
      file_large = file.sub(File.extname(file), '_LRG.jpg')   # copy to image_name_LRG.jpg
      FileUtils.cp( file, "../scratch/#{file_large}")
      
      img_430 = img.scale(scale)
      
      img_430.write(file)
      
    end
      
    #img = Magick::Image::read(file).first
    #puts "   Format: #{img.format}"
    #puts "   Geometry: #{img.columns}x#{img.rows}"
    #puts "   Class: " + case img.class_type
    #                        when Magick::DirectClass
    #                            "DirectClass"
    #                        when Magick::PseudoClass
    #                            "PseudoClass"
    #                    end
    #puts "   Depth: #{img.depth} bits-per-pixel"
    #puts "   Colors: #{img.number_colors}"
    #puts "   Filesize: #{img.filesize}"
    #puts "   Resolution: #{img.x_resolution.to_i}x#{img.y_resolution.to_i} "+
    #    "pixels/#{img.units == Magick::PixelsPerInchResolution ?
    #    "inch" : "centimeter"}"
    #if img.properties.length > 0
    #    puts "   Properties:"
    #    img.properties { |name,value|
    #        puts %Q|      #{name} = "#{value}"|
    #    }
    #end
    puts "- - - - - :rmagik-E"
end



image_list = Dir.glob("./*.jpg")

image_list.each{ |image|
  
  next if image =~ /_LRG\./
  
  rmagik_info(image) # extension hardcoded
  
}
