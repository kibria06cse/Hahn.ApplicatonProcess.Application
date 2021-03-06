﻿using Hahn.ApplicatonProcess.May2020.Data.EntityFramework;
using Hahn.ApplicatonProcess.May2020.Data.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Applicants.Queries
{
    public class GetApplicantByIdQueryQueryHandler : IRequestHandler<GetApplicantByIdQuery, ApplicantDto>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetApplicantByIdQueryQueryHandler(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        public async Task<ApplicantDto> Handle(GetApplicantByIdQuery request, CancellationToken cancellationToken)
        {
            var applicants = await _dbContext.Applicants.Where(i => i.IsDeleted == false && i.Id == request.ID).ToListAsync();

            var output = applicants.Select(x => new ApplicantDto
            {
                ID = x.Id,
                Name = x.Name,
                FamilyName = x.FamilyName,
                Address = x.Address,
                EMailAdress = x.EMailAdress,
                CountryOfOrigin = x.CountryOfOrigin,
                Age = x.Age,
                Hired = x.Hired
            }).FirstOrDefault();

            return output;
        }
    }
}
