using Hahn.ApplicatonProcess.May2020.Data.EntityFramework;
using Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands.DeleteApplicant
{
    public class DeleteApplicantCommandHandler : IRequestHandler<DeleteApplicantCommand, ApplicantVM>
    {
        private readonly ApplicationDbContext _dbContext;

        public DeleteApplicantCommandHandler(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public async Task<ApplicantVM> Handle(DeleteApplicantCommand request, CancellationToken cancellationToken)
        {
            var response = new ApplicantVM
            {
                Status = false,
                Message = "error"
            };

            try
            {
                var entity = await _dbContext.Applicants.FindAsync(request.Id);
                entity.MarkAsDeleted();

                await _dbContext.SaveChangesAsync();

                response.Status = true;
                response.Message = "entity deleted successfully.";
                response.Id = entity.Id;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return response;
        }
    }
}
