using Hahn.ApplicatonProcess.May2020.Data.Dtos;
using Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands;
using Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands.DeleteApplicant;
using Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands.UpdateApplicant;
using Hahn.ApplicatonProcess.May2020.Domain.Applicants.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApplicantController : ControllerBase
    {
        private readonly ILogger<ApplicantController> _logger;
        private readonly IMediator _mediator;

        public ApplicantController(ILogger<ApplicantController> logger, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        [HttpGet("", Name = "GetAll")]
        public async Task<IActionResult> Get(int id)
        {
            var data = await _mediator.Send(new GetApplicantListQuery());
            return Ok(data);
        }

        [HttpGet("{id}", Name = "GetById")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await _mediator.Send(new GetApplicantByIdQuery { ID = id });
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]ApplicantDto model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var data = await _mediator.Send(new CreateApplicantCommand { Applicant = model });
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] ApplicantDto model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (model.ID == 0)
                {
                    return BadRequest();
                }

                var data = await _mediator.Send(new UpdateApplicantCommand { Applicant = model });
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _mediator.Send(new DeleteApplicantCommand { Id = id });
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return NoContent();
        }


    }
}
