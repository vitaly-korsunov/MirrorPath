using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.MSIdentity.Shared;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Server.Data;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly DataContext _context;

        public InvoicesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/   Invoice
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoice()
        {
            return await _context.Invoice.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Invoice>> GetInvoice(int id)
        {
            var invoice = await _context.Invoice.FindAsync(id);

            if (invoice == null)
            {
                return NotFound();
            }

            return invoice;
        }

        [HttpPut("{id}")]
      public async Task<ActionResult<Invoice>> Put(int id,  Invoice invoice  )
        {
        //    Invoice InvoiceClass = JsonConvert.DeserializeObject<Invoice>(invoice.ToString());
          
            if (id != invoice.Id)
            {
                return BadRequest();
            }

            _context.Entry(invoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
    throw;           
            }
            return CreatedAtAction("GetInvoice", new { id = invoice.Id }, invoice);
         //   return NoContent();
        }


       [HttpPost]
        public async Task<ActionResult<Invoice>> PostInvoice(Invoice invoice)
        {
         //   Invoice InvoiceClass = JsonConvert.DeserializeObject<Invoice>(invoice.ToString());
            _context.Invoice.Add(invoice);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvoice", new { id = invoice.Id }, invoice);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoiceType(int id)
        {
            var invoice = await _context.Invoice.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            _context.Invoice.Remove(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
