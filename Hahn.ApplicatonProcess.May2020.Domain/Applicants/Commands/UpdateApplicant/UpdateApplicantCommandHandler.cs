using Hahn.ApplicatonProcess.May2020.Data.Dtos;
using Hahn.ApplicatonProcess.May2020.Data.EntityFramework;
using Hahn.ApplicatonProcess.May2020.Data.Models;
using Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands.UpdateApplicant
{
    public class UpdateApplicantCommandHandler : IRequestHandler<UpdateApplicantCommand, ApplicantVM>
    {
        private readonly ApplicationDbContext _dbContext;

        public UpdateApplicantCommandHandler(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
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
                var entity = await _dbContext.Applicants.FindAsync(applicantDto.ID);

                entity.Update(applicantDto.Name, applicantDto.FamilyName, applicantDto.Address, applicantDto.CountryOfOrigin, applicantDto.EMailAdress, applicantDto.Age, applicantDto.Hired);

                await _dbContext.SaveChangesAsync();

                response.Status = true;
                response.Message = "Applicant updated successfully.";
                response.Id = entity.Id;

            }
            catch (Exception ex)
            {
                response.Message = ex.Message.ToString();
            }

            return response;
        }
    }
}
