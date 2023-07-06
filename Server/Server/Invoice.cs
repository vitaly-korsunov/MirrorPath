using System.ComponentModel.DataAnnotations;

namespace Server
{
    public class Invoice
    {
        public int Id { get; set; }
        [DisplayFormat(DataFormatString = "{dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime InvoiceDate { get; set; }
        public int InvoiceAmount { get; set; }
        public string? invoiceStatus { get; set; }


    }
}


