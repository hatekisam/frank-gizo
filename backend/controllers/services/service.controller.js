const Service = require("../../models/service/service_content.model");

const { uploadFile } = require("../../utils/uploadImage");

exports.createService = async (req, res) => {
  try {
    const {category, title, description, price } = req.body;

    // Check if service exists
    let service = await Service.findOne({ title });

    if (service) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Service already exists",
      });
    }

      const newService = new Service({
        category,
      title,
      description,
      image: await uploadFile(req, res),
      price: parseInt(price),
    });

    // Save service
    await newService.save();

    res.status(201).json({
      success: true,
      status: 201,
      message: "Service created successfully",
      data: newService,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};



//getting all services 
exports.getAllServicesWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const perPage = parseInt(req.params.perPage) || 10;
    const count = await Service.countDocuments();
    if (count === 0) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "No services found",
      });
      return;
    }

    const totalPages = Math.ceil(count / perPage);
    if (page > totalPages) {
      res.status(400).json({
        success: false,
        status: 400,
        message: `Page ${page} does not exist`,
      });
      return;
    }

    const services = await Service.find()
      .skip((page - 1) * perPage)
      .limit(perPage).populate("category")
      ;

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Services retrieved successfully",
      data: {
        services,
        currentPage: page,
        totalPages,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


//getting all services without pagination for mobile
exports.getAllServices = async (req, res) => {
  
  try {
    const services = await Service.find().populate("category");

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Services retrieved successfully",
      data: {
        services,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
exports.getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
        data: {
          service
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
//delete service
exports.deleteService = async (req, res) => {

  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Service not found",
      });
    }

    //delete service from db
    await service.deleteOne();
    res.status(200).json({
      success: true,
      status: 200,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//update service by admin
exports.updateService = async (req, res) => {
  
  try {
      const {
          title, description, price
      } = req.body;
      
    //validate req.body

 
    //check if service exists
    let service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Service not found",
      });
    }

  let exists = await Service.findOne({title});
    if (exists) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Service already exists",
      });
    }

        //updating service
       const updateService = await Service.findByIdAndUpdate(
          req.params.id,
          {
            title,description,price,image: await uploadFile(req,res)
          },
          {
            new: true,
          }
        );
        res.status(200).json({
          success: true,
          status: 200,
          message: "Service updated successfully",
          data: {
            updateService,
          },
        });
     
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
