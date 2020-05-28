using Hahn.ApplicatonProcess.May2020.Data.Dtos;
using Hahn.ApplicatonProcess.May2020.Data.EntityFramework;
using Hahn.ApplicatonProcess.May2020.Data.Models;
using Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands.Models;
using Hahn.ApplicatonProcess.May2020.Domain.Countries.Queries;
using MediatR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands
{
    public class CreateApplicantCommandHandler : BaseCommandHandler, IRequestHandler<CreateApplicantCommand, ApplicantVM>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILogger<CreateApplicantCommandHandler> _logger;

        public CreateApplicantCommandHandler(ApplicationDbContext dbContext, ILogger<CreateApplicantCommandHandler> logger, IMediator mediator ): base(mediator)
        {
            this._dbContext = dbContext;
            this._logger = logger;
        }

        public async Task<ApplicantVM> Handle(CreateApplicantCommand request, CancellationToken cancellationToken)
        {
            var response = new ApplicantVM
            {
                Status = false,
                Message = "error"
            };

            try
            {
                var applicantDto = request.Applicant;

                await  ValidateApplicatint(applicantDto);

                var entity = Applicant.Create(applicantDto.Name, applicantDto.FamilyName, applicantDto.Address, applicantDto.CountryOfOrigin, applicantDto.EMailAdress, applicantDto.Age, applicantDto.Hired);

                var data = await _dbContext.AddAsync(entity);

                await _dbContext.SaveChangesAsync();

                _logger.LogInformation("New Applicant created", data);

                response.Status = true;
                response.Message = "Applicant edited successfully.";
                response.Id = entity.Id;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString(), request.Applicant);
                response.Message = ex.Message.ToString();
            }

            return response;
        }

      
    }
}
