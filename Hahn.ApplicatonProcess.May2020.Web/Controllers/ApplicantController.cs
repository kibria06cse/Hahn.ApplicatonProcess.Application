using Hahn.ApplicatonProcess.May2020.Data.Dtos;
using Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands;
using Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands.DeleteApplicant;
using Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands.UpdateApplicant;
using Hahn.ApplicatonProcess.May2020.Domain.Applicants.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
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
    [Route("api/[controller]")]
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
        public async Task<IActionResult> Get()
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
        //[ProducesResponseType(StatusCodes.Status201Created)]

        public async Task<IActionResult> Post(ApplicantDto model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var data = await _mediator.Send(new CreateApplicantCommand { Applicant = model });
                //return CreatedAtRoute("GetById",new { id = data.Id });
                return CreatedAtAction(nameof(GetById), new { id = data.Id }, data);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString(), model);
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
                _logger.LogError(ex.Message.ToString(), model);
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
