// import { orderValidationSchema } from "../validator/validate.js";
import Order from "../models/orders.js";

const addOrder = async (req, res) => {
 

    try {
        const { fullName, phone, wilaya, commune, productName, quantity, status, notification } = req.body;
        const orderData = await Order.findOne({
            where: { phone }
        });
        if (orderData) {
            const msg = {}
            msg.message = "رقم الهاتف هذا تم الطلب به مسبقا "
            return res.json({ success: false, msg: msg });
        }
        const order = await Order.create({
            fullName,
            phone,
            wilaya,
            commune,
            productName,
            quantity,
            status,
            notification,
            // لو عندك حقل التاريخ وتبي تحط التاريخ الحالي تلقائياً، Sequelize يتعامل معه لو معرفته defaultValue
        });
        res.json({ success: true, msg: "تم طلب المنتج بنجاح " });
    } catch (error) {
        res.json({ success: false, msg: error })
    }
};



const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params
        const deletedOrder = await orderModel.findByIdAndDelete(id)
        if (deleteOrder) {
            return res.json({ success: true, msg: 'لقد تم حذف الطلب' })
        } else {
            res.json({ success: false, msg: "لا يمكنك هذا هذا الطلب" })
        }

    } catch (error) {
        console.log(error)
    }
}
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll(); // Sequelize
        res.json({ success: true, orders });  // جمع البيانات وإرسالها
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'فشل في جلب الطلبات' });
    }
};






const updateOrder = async (req, res) => {
    try {
        // استلام المعرف (ID) من المعلمات
        const { id } = req.params;
        // استلام البيانات التي سيتم تحديثها من الجسم (req.body)
        const { status, notification } = req.body;


        // البحث عن الطلب في قاعدة البيانات وتحديثه
        const updatedOrder = await orderModel.findByIdAndUpdate(
            id, // المعرف
            {
                status

            }, // ارجاع الوثيقة المحدثة
            // { new: true }
        );

        // التحقق إذا كان الطلب تم تحديثه بنجاح
        if (updatedOrder) {
            return res.json({ success: true, msg: 'تم تحديث الطلب بنجاح', status: status });
        } else {
            return res.json({ success: false, msg: 'لا يمكن تحديث هذا الطلب' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: 'حدث خطأ أثناء التحديث' });
    }
};



const updateAllNotifications = async (req, res) => {
    try {
        // تحديث جميع الطلبات وجعل notification 0
        const result = await orderModel.updateMany({}, // بدون فلتر، يعني سيتم تحديث جميع الطلبات
            { $set: { notification: 0 } } // تعيين notification إلى 0 لجميع الطلبات
        );

        if (result.modifiedCount > 0) {
            res.json({ success: true, msg: "تم تحديث جميع الإشعارات بنجاح" });
        } else {
            res.json({ success: false, msg: "لا توجد طلبات لتحديثها" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "حدث خطأ أثناء التحديث" });
    }
}

export { addOrder, getAllOrders, deleteOrder, updateOrder, updateAllNotifications };