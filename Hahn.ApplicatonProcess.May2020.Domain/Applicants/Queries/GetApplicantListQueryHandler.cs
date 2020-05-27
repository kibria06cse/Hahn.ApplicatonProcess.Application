using Hahn.ApplicatonProcess.May2020.Data.EntityFramework;
using Hahn.ApplicatonProcess.May2020.Domain.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Applicants.Queries
{
    public class GetApplicantListQueryHandler : IRequestHandler<GetApplicantListQuery, List<ApplicantDto>>
    {
        public GetApplicantListQueryHandler(ApplicationDbContext dbContext)
        {

        }
        public Task<List<ApplicantDto>> Handle(GetApplicantListQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
