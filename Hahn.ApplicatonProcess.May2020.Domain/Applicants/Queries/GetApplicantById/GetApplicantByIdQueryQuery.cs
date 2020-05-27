using Hahn.ApplicatonProcess.May2020.Data.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Applicants.Queries
{
    public class GetApplicantByIdQuery : IRequest<ApplicantDto>
    {
        public int ID { get; set; }
    }
}
