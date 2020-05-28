using Hahn.ApplicatonProcess.May2020.Data.Dtos;
using Hahn.ApplicatonProcess.May2020.Data.EntityFramework;
using Hahn.ApplicatonProcess.May2020.Data.Models;
using Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands.Models;
using MediatR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands.UpdateApplicant
{
    public class UpdateApplicantCommandHandler : BaseCommandHandler, IRequestHandler<UpdateApplicantCommand, ApplicantVM>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILogger<UpdateApplicantCommandHandler> _logger;

        public UpdateApplicantCommandHandler(ApplicationDbContext dbContext, ILogger<UpdateApplicantCommandHandler> logger, IMediator mediator) : base(mediator)
        {
            this._dbContext = dbContext;
            this._logger = logger;
        }

        public async Task<ApplicantVM> Handle(UpdateApplicantCommand request, CancellationToken cancellationToken)
        {
            var response = new ApplicantVM
            {
                Status = false,
                Message = "error"
            };

            try
            {
                var applicantDto = request.Applicant;

                await ValidateApplicatint(applicantDto);

                var entity = await _dbContext.Applicants.FindAsync(applicantDto.ID);

                entity.Update(applicantDto.Name, applicantDto.FamilyName, applicantDto.Address, applicantDto.CountryOfOrigin, applicantDto.EMailAdress, applicantDto.Age, applicantDto.Hired);

                await _dbContext.SaveChangesAsync();

                _logger.LogInformation("Applicant updated successfully", entity);

                response.Status = true;
                response.Message = "Applicant updated successfully.";
                response.Id = entity.Id;

            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message.ToString(), request.Applicant);
                response.Message = ex.Message.ToString();
            }

            return response;
        }
    }
}
