
import Purchase from '../../models/Purchase';


export const notifySuperAdmin = async (
  newPurchase: any, // Type can be adjusted based on your purchase model
  studentPartner: string,
  buyer: string,
  course: string
) => {
  try {
    // Here you can log the purchase to the console
    console.log("New purchase recorded:", newPurchase);
    console.log("Student Partner ID:", studentPartner);
    console.log("Buyer ID:", buyer);
    console.log("Course ID:", course);

    // Create the purchase record in the database
    const purchase = await Purchase.create({
      buyerId: buyer,
      courseId: course,
      studentPartnerId: studentPartner,
      finalPrice: newPurchase.finalPrice, 
      paymentId: newPurchase.paymentId, 
    });

    // Additional logic to update the super admin dashboard can be added here

    return purchase; // Return the purchase for further use if necessary
  } catch (error) {
    console.error("Error notifying super admin:", error);
    throw new Error("Failed to notify super admin.");
  }
};
